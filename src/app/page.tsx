export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Location Marketplace App
        </h1>
        <p className="text-center text-muted-foreground mb-4">
          Marketplace baseado em geolocalização
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">🗺️ Busca por Localização</h3>
            <p className="text-sm text-muted-foreground">
              Encontre fornecedores e prestadores próximos a você
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">🛒 E-commerce Integrado</h3>
            <p className="text-sm text-muted-foreground">
              Compre produtos com pagamento online seguro
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">⭐ Avaliações</h3>
            <p className="text-sm text-muted-foreground">
              Sistema completo de avaliações e reviews
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
