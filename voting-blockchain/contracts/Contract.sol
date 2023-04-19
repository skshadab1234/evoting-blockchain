pragma solidity ^0.8.0;

contract VotingRecord {
    struct Voter {
        address VoterAddress;
        bool hasVoted;
        string votedFor;
        string position;
        address voterUniqueId;
    }
    
    mapping(address => Voter) public voters;
    Voter[] public votingRecords;

    function vote(string memory candidate, string memory position) public {
        require(!voters[msg.sender].hasVoted, "This voter has already voted.");
        voters[msg.sender].VoterAddress = msg.sender;
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedFor = candidate;
        voters[msg.sender].position = position;


        votingRecords.push(voters[msg.sender]);
    }
    
 
    function searchByPosition(string memory position) public view returns (Voter[] memory) {
        uint256 count = 0;
        
        for (uint256 i = 0; i < votingRecords.length; i++) {
            if (keccak256(bytes(votingRecords[i].position)) == keccak256(bytes(position))) {
                count++;
            }
        }
        
        Voter[] memory result = new Voter[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < votingRecords.length; i++) {
            if (keccak256(bytes(votingRecords[i].position)) == keccak256(bytes(position))) {
                result[index] = votingRecords[i];
                index++;
            }
        }
        
        return result;
    }
}
