import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuides } from "@/data/guides";
import GuideTemplate from "@/components/GuideTemplate";

interface GuidePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  
  return guides.map((guide) => ({
    slug: guide.id,
  }));
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug);
  
  if (!guide) {
    notFound();
  }

  return <GuideTemplate guide={guide} />;
}
