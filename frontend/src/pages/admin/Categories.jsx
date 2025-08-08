import CategoryList from "../../features/categories/CategoryList";

export default function ProductsPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Categorias</h1>
       
      </div>
      <CategoryList />
    </div>
  );
}

