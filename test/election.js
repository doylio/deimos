const Election = artifacts.require("./Election.sol");

contract("Election", async (accounts) => {
  it("initialized with 2 candidates", async () => {
    const election = await Election.deployed();
    const candidatesCount = await election.candidatesCount();
    assert.equal(candidatesCount, 2);
  });

  it("initialized the candidates with the correct values", async () => {
    const election = await Election.deployed();
    const correctData = [
      {
        id: 1,
        name: "Justin Trudeau",
        voteCount: 0,
      },
      {
        id: 2,
        name: "Elizabeth May",
        voteCount: 0,
      },
    ];

    for (const candidateMatch of correctData) {
      const candidate = await election.candidates(candidateMatch.id);
      assert.equal(
        candidate.name,
        candidateMatch.name,
        "contains the right name"
      );
      assert.equal(
        candidate.voteCount,
        candidateMatch.voteCount,
        "contains the correct voteCount"
      );
    }
  });

  it("allows a voter to cast a vote", async () => {
    const election = await Election.deployed();

    const candidateId = 1;
    await election.vote(candidateId, { from: accounts[0] });

    const voted = await election.voters(accounts[0]);
    assert(voted, "the voter was marked as voted");

    const candidate = await election.candidates(candidateId);
    assert.equal(candidate.voteCount, 1, "increment candidates cote by 1");
  });
});
