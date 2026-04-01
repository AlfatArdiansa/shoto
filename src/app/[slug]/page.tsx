import { Redirector } from "@/components/redirector";

export default async function Short({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/2 mx-auto">
        <Redirector slug={slug} />
      </div>
    </div>
  );
}
