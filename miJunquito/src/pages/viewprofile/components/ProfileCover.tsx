import fallbackBusinessImage from "../../../assets/junquito-hero.jpg";

interface ProfileCoverProps {
  imageUrl: string | null;
  businessName: string;
}

export default function ProfileCover({
  imageUrl,
  businessName,
}: ProfileCoverProps) {
  return (
    <div className="profile-cover-enter relative h-[240px] overflow-hidden rounded-3xl bg-slate-200 shadow-xl shadow-slate-900/10 sm:h-[340px] lg:h-[440px]">
      <img
        src={imageUrl ?? fallbackBusinessImage}
        alt={`Portada de ${businessName}`}
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
    </div>
  );
}
