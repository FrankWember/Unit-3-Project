import React, { useState, useEffect } from "react";
import Categories from "./Categories";
import Search from "./Search";
import KudoBoard from "./KudoBoard";
import CreateKudo from "./CreateKudo";
import Header from "./Header";
import Footer from "./Footer";
function Home() {
  const [kudos, setKudos] = useState([]);
  const [filteredKudo, setFilteredKudo] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Use here because i want to load the kudos on the page when it initially loads
  useEffect(() => {
    fetchKudos();
  }, []);

  // Fetching the Kudos with the Get Method
  const fetchKudos = async () => {
    try {
      const response = await fetch("http://localhost:3000/kudoboard");
      const data = await response.json();
      setKudos(data);
      setFilteredKudo(data);
    } catch (error) {
      console.error(`Error fetching the kudos:`, error);
    }
  };

  const handleSearch = (query) => {
    console.log(query);
    setFilteredKudo(
      kudos.filter((kudo) =>
        kudo.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // useEffect(() => {
  //   const now = new Date();
  //   const twoMinutes = new Date(now.getTime() - 2 * 60 * 1000);

  //   const filtered = filterCategory === "ALL";
  // });

  const handleCategoryFilter = (category) => {
    console.log(filteredKudo);
    console.log(kudos);
    if (category === "All") {
      setFilteredKudo(kudos); //Has all the kudos
    } else if (category === "RECENT") {
      const now = new Date();
      const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
      setFilteredKudo(
        kudos.filter((kudo) => new Date(kudo.date) >= twoMinutesAgo)
      );
    } else {
      setFilteredKudo(
        kudos.filter(
          (kudo) => kudo.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const handleDelete = (id) => {
    try {
      fetch(`http://localhost:3000/kudoboard/${id}`, {
        method: "DELETE",
      });
      const updatedKudos = kudos.filter((kudo) => kudo.id !== id);
      setKudos(updatedKudos);
      setFilteredKudo(updatedKudos);
    } catch (error) {
      console.error("Error deleting kudo", error);
    }
  };

  const handleCreateKudo = (newKudo) => {
    setKudos([...kudos, newKudo]); //prefer the spread operator to Add list
    setFilteredKudo([...kudos, newKudo]);
  };

  return (
    <div>
      <Header />

      <Categories onFilter={handleCategoryFilter} />
      <Search onSearch={handleSearch} />
      <div>
        <button onClick={() => setShowCreateModal(true)}>
          Create a New Board
        </button>

        {showCreateModal && (
          <CreateKudo
            onCreate={handleCreateKudo}
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </div>
      <KudoBoard kudos={filteredKudo} onDelete={handleDelete} />
      <Footer />
    </div>
  );
}

export default Home;
