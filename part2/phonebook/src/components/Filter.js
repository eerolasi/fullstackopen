const Filter = ({ filter, handleFilterPerson }) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input value={filter} onChange={handleFilterPerson} />
      </div>
    </form>
  );
};

export default Filter;
