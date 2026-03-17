function ViewContact({ parameter }) {
  if (!parameter) {
    return <p>No parameter selected.</p>;
  }

  return (
    <section>
      <h2>{parameter.name}</h2>
      <p>Email: {parameter.email}</p>
      <p>Phone: {parameter.phone}</p>
      <p>Notes: {parameter.notes || "No notes available."}</p>
    </section>
  );
}

export default DetailComponent;
