async function fetchData() {
  const response = await fetch("assets/scripts/data.json");
  const data = await response.json();
  console.log(data);
  return data;
}

function createListingNode(jobListing) {
  let listing = document.createElement("div");
  listing.classList.add("jobList");
  listing.id = jobListing.id;

  let jobDescription = document.createElement("div");
  jobDescription.classList.add("jobDescription");

  let companyLogo = createCompanyLogo(jobListing);
  let jobTags = createJobTags(jobListing);

  jobDescription.innerText = jobListing.position;

  listing.append(companyLogo, jobDescription, jobTags);

  return listing;
}

function createJobTags(jobListing) {
  let jobTags = document.createElement("div");
  jobTags.classList.add("jobTags");

  let roleTag = createJobTag(jobListing.role);
  let levelTag = createJobTag(jobListing.level);
  let languagesTags = jobListing.languages.map((listing) =>
    createJobTag(listing)
  );
  let toolsTags = jobListing.tools.map((listing) => createJobTag(listing));
  jobTags.append(roleTag, levelTag, ...toolsTags, ...languagesTags);
  return jobTags;
}

function createJobTag(content) {
  let tag = document.createElement("div");
  tag.append(content);
  tag.classList.add("jobTag");
  return tag;
}

function createCompanyLogo(jobListing) {
  let companyLogo = document.createElement("div");
  companyLogo.classList.add("companyLogo");
  let img = document.createElement("img");
  img.src = `assets/${jobListing.logo}`;
  companyLogo.append(img);
  return companyLogo;
}
async function init() {
  const listings = await fetchData();
  const nodes = listings.map(createListingNode);
  const listingContainer = document.getElementById("jobListingContainer");
  nodes.forEach((node) => {
    listingContainer.appendChild(node);
  });
}
init();
