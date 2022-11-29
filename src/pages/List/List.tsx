import { Card } from "../../components/Card";
import data from "../../data/base_list.json";

function List() {
  return (
    <div className="flex flex-wrap justify-around md:gap-4 gap-2 px-4 rounded-xl bg-orange-50">
      {data.map((pm) => (
        <Card pokemon={pm} key={pm.paldeaId.toString() + pm.altForm} />
      ))}
    </div>
  );
}

export default List;
