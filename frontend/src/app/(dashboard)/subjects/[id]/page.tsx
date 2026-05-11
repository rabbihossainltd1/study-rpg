import { SUBJECTS } from "@/lib/subjects";
import SubjectDetailClient from "./SubjectDetailClient";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ id: s.id }));
}

export default function SubjectDetailPage({ params }: { params: { id: string } }) {
  return <SubjectDetailClient id={params.id} />;
}
