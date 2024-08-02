import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";

// FIXME: Check the "No available options error"

const transformData = (data) => {
  if (!data || !data.results) return [];

  console.log("Transforming data:", data.results); // Veriyi kontrol et

  return data.results.map((item, index) => ({
    key: index.toString(),
    data: item,
    children: Object.entries(item).map(([key, value], subIndex) => ({
      key: `${index}-${subIndex}`,
      data: { name: key, value: JSON.stringify(value) },
    })),
  }));
};

const getDynamicColumns = (data) => {
  if (!data || !data.results) return [];

  const keys = new Set();

  data.results.forEach((item) => {
    Object.keys(item).forEach((key) => keys.add(key));
  });

  return Array.from(keys).map((key) => ({
    field: key,
    header: key.charAt(0).toUpperCase() + key.slice(1),
    expander: key === "name",
  }));
};

function TreeTableComponent({ data }) {
  const transformedData = transformData(data);
  const dynamicColumns = getDynamicColumns(data);

  return (
    <TreeTable value={transformedData} tableStyle={{ minWidth: "50rem" }}>
      {dynamicColumns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          expander={col.expander}
        />
      ))}
    </TreeTable>
  );
}

export default TreeTableComponent;
