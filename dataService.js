const fetchDataFromDatabase = async () => {
  return ["item1", "item2", "item3"];
};

const getData = async () => {
  const data = await fetchDataFromDatabase();
  return data;
};

module.exports = { getData };
