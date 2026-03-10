import { useEffect, useState } from "react";
import { createIndividual } from "../api/individualsApi.js";
import { getSpecies } from "../api/speciesApi.js";

function IndividualsForm({ onIndividualAdded }) {
  const [nickname, setNickname] = useState("");
  const [scientist, setScientist] = useState("");
  const [speciesId, setSpeciesId] = useState("");
  const [species, setSpecies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSpecies() {
      try {
        const data = await getSpecies();
        setSpecies(data);
      } catch (err) {
        console.error(err);
        setError("Could not load species.");
      }
    }

    loadSpecies();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await createIndividual({
        nickname,
        scientist_tracking: scientist,
        species_id: Number(speciesId),
      });

      setNickname("");
      setScientist("");
      setSpeciesId("");

      if (onIndividualAdded) {
        onIndividualAdded();
      }
    } catch (err) {
      console.error(err);
      setError("Could not create individual.");
    }
  }

  return (
    <section>
      <h2>Add Individual</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <label>Nickname</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />

        <label>Scientist Tracking</label>
        <input
          type="text"
          value={scientist}
          onChange={(e) => setScientist(e.target.value)}
          required
        />

        <label>Species</label>
        <select
          value={speciesId}
          onChange={(e) => setSpeciesId(e.target.value)}
          required
        >
          <option value="">Select species</option>
          {species.map((sp) => (
            <option key={sp.id} value={sp.id}>
              {sp.common_name}
            </option>
          ))}
        </select>

        <button type="submit">Add Individual</button>

        {error && <p>{error}</p>}
      </form>
    </section>
  );
}

export default IndividualsForm;
