// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title MilestoneEscrow
 * @dev A trustless escrow contract holding USDC for agency milestones.
 * Funds are released only when the Infinity Solution AI Project Manager 
 * triggers the signed webhook verification, or upon client mutual agreement.
 */
contract MilestoneEscrow is Ownable, ReentrancyGuard {
    
    IERC20 public usdcToken;
    
    struct Milestone {
        address client;
        address agency;
        uint256 amount;
        bool isFunded;
        bool isReleased;
    }
    
    // Mapping from an off-chain Milestone UUID (as bytes32) to the Milestone struct
    mapping(bytes32 => Milestone) public milestones;
    
    // The authorized backend wallet that signs deliverable verifications
    address public aiOracleSigner;
    
    event MilestoneFunded(bytes32 indexed milestoneId, address indexed client, uint256 amount);
    event MilestoneReleased(bytes32 indexed milestoneId, address indexed agency, uint256 amount);
    
    constructor(address _usdcToken, address _aiOracleSigner) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcToken);
        aiOracleSigner = _aiOracleSigner;
    }
    
    /**
     * @dev Client deposits funds into the smart contract for a specific milestone.
     */
    function fundMilestone(bytes32 _milestoneId, address _agency, uint256 _amount) external nonReentrant {
        require(!milestones[_milestoneId].isFunded, "Milestone already funded");
        require(_amount > 0, "Amount must be greater than 0");
        
        // Transfer USDC from client to this contract
        require(usdcToken.transferFrom(msg.sender, address(this), _amount), "USDC transfer failed");
        
        milestones[_milestoneId] = Milestone({
            client: msg.sender,
            agency: _agency,
            amount: _amount,
            isFunded: true,
            isReleased: false
        });
        
        emit MilestoneFunded(_milestoneId, msg.sender, _amount);
    }
    
    /**
     * @dev The Backend Webhook triggers this, passing a cryptographic signature
     * proving the AI PM verified the deliverables.
     */
    function releaseFunds(bytes32 _milestoneId, bytes memory _signature) external nonReentrant {
        Milestone storage m = milestones[_milestoneId];
        require(m.isFunded, "Milestone not funded");
        require(!m.isReleased, "Funds already released");
        
        // Construct the message hash that the Oracle should have signed
        bytes32 messageHash = keccak256(abi.encodePacked(_milestoneId, m.agency, m.amount));
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
        
        // Verify the signature is from our trusted AI Oracle Wallet
        require(recoverSigner(ethSignedMessageHash, _signature) == aiOracleSigner, "Invalid oracle signature");
        
        m.isReleased = true;
        
        // Release funds to the agency
        require(usdcToken.transfer(m.agency, m.amount), "USDC transfer failed");
        
        emit MilestoneReleased(_milestoneId, m.agency, m.amount);
    }
    
    // --- Cryptography Helpers ---
    
    function getEthSignedMessageHash(bytes32 _messageHash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }
    
    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }
    
    function splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
