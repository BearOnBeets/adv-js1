async function getGithubRepoInfo(repoName) {
  const apiResponse = await fetch(
    `https://api.github.com/search/repositories?q=${repoName}`
  );
  const result = await apiResponse.json();
  result.items.map((repo) => answer(repo));
}

async function answer(repo) {
  const ownerResponse = await fetch(repo.owner.url);
  const ownersData = await ownerResponse.json();
  const branchResponse = await fetch(repo.branches_url.split("{")[0]);
  const branchData = await branchResponse.json();
  const answer = {
    name: repo.name,
    full_name: repo.full_name,
    private: repo.private,
    owner: {
      login: ownersData.login,
      name: ownersData.name,
      followersCount: ownersData.followers,
      followingCount: ownersData.following,
    },
    licenseName: repo.license,
    score: repo.score,
    numberOfBranch: branchData.length,
  };

  console.log(answer);
}

getGithubRepoInfo("node");
