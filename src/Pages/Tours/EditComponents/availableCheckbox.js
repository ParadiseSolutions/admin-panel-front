const AvailableCheckbox = ({
  available,
  availableFromIDs,
  setAvailableFromIDs,
}) => {
  // Controlado 100% desde el padre: evita state local desfasado al cambiar
  // tourSettings o al vaciar la lista (el useEffect anterior no sincronizaba []).
  const idStr = String(available.id);
  const checked = (availableFromIDs || []).some(
    (item) => String(item) === idStr
  );

  const onChangeMembers = (e) => {
    const selection = String(e.target.value);
    const current = (availableFromIDs || []).map(String);
    const next = e.target.checked
      ? current.includes(selection)
        ? current
        : [...current, selection]
      : current.filter((item) => item !== selection);
    setAvailableFromIDs(next);
  };

  return (
    <div className="controls my-2">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={available.id}
          name={available.name}
          onChange={onChangeMembers}
          checked={checked}
        />
        <label className="form-check-label">{`${available.name}`}</label>
      </div>
    </div>
  );
};

export default AvailableCheckbox;
