import React from "react";

const Form = ({ search, getSearch, onSearchChange }) => {
  const swal = () => {};

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    if (e.target.value === " ") {
      swal({
        title: "Oops!!",
        text: "You must enter atleast one recipe name to search!",
        icon: "info"
      });
      return false;
    } else {
      onSearchChange(e.target.value);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={getSearch} className="search-form">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search recipes..."
          className="search-bar"
        />
        <button type="submit" className="search-button">
          Search&nbsp;&nbsp;<i className="fas fa-search"></i>
        </button>
      </form>
    </React.Fragment>
  );
};

export default Form;
