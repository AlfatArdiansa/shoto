export default async function Short({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/2 mx-auto">
        <h1 className="text-center font-bold text-4xl">URL Short: {slug}</h1>
      </div>
    </div>
  );
}
