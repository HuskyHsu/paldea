import clsx from "clsx";
import data from "../../data/base_list.json";

import { Card } from "../../components/Card";
import { TypeIcon } from "../../components/TypeIcon";
import { TypeMap } from "../../models";

function List() {
  return (
    <div className="rounded-xl bg-orange-50">
      <form className="pt-6 px-4">
        <ul className="flex flex-col items-center gap-y-8">
          <li className="w-full md:w-5/6 flex flex-wrap justify-center items-center gap-4">
            {Object.keys(TypeMap).map((type) => (
              <div key={type} className="group relative h-8">
                <TypeIcon
                  type={type}
                  className={clsx("w-8 h-8")}
                  button={true}
                  clickFn={() => {}}
                />
              </div>
            ))}
          </li>
        </ul>
      </form>
      <div className="flex flex-wrap justify-around gap-2 p-4">
        {data.map((pm) => (
          <Card pokemon={pm} key={pm.paldeaId.toString() + pm.altForm} />
        ))}
      </div>
    </div>
  );
}

export default List;
