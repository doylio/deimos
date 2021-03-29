pragma solidity >=0.6.0 <0.8.0;

contract Election {
    struct Candidate {
       uint id;
       string name;
       uint numVotes;
    } 

    struct Campaign {
        uint id;
        address creator;
        string name;
        uint numCandidates;
        mapping(uint => Candidate) candidates;
        uint votePrice;
    }
    
    mapping(uint => Campaign) public campaigns;
    uint public numCampaigns;

   constructor() public {
   }

   function addCampaign(string memory _name, Candidate[] _candidates, uint _votePrice) public {
       numCampaigns++;
       mapping(uint => Candidate) candidates;

       campaigns[numCampaigns] = Campaign({
           id: campaignsCount,
           name: _name,
           candidates: candidates,
           numCandidates: _candidates.length
       });

   }

   function vote (uint _candidateId) public {
       require(_candidateId <= candidatesCount && _candidateId > 0, "Error, _candidateId invalid");
       require(voters[msg.sender] == false, "Error, voter has already voted");
       candidates[_candidateId].voteCount++;
       voters[msg.sender] = true;
   }
}