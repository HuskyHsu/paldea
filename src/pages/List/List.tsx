import { Card } from "../../components/Card";
import data from "../../data/base_list.json";

function List() {
  return (
    <div className="flex flex-wrap gap-4 bg-orange-50 px-4 justify-around">
      {data.map((pm) => (
        <Card pokemon={pm} key={pm.paldeaId.toString() + pm.altForm} />
      ))}
    </div>
  );
}

export default List;
