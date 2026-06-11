const HighlightLabel = ({ name, query }: { name: string; query: string }) => {
  const index = name.toLowerCase().indexOf(query.toLowerCase());

  if (index === -1) {
    return <span>{name}</span>;
  }

  return (
    <span>
      {name.slice(0, index)}
      <mark className="search-keyword-input__highlight">
        {name.slice(index, index + query.length)}
      </mark>
      {name.slice(index + query.length)}
    </span>
  );
}

export default HighlightLabel;