type FrameProps = {
  src: string;
  title: string;
  ratio?: string;
  height?: number;
};

function Frame({ src, title, ratio, height }: FrameProps) {
  return (
    <div
      className="my-8 overflow-hidden rounded-2xl border border-brand-separator"
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="h-full w-full"
        height={height}
      />
    </div>
  );
}

export function YouTube({ id, title = 'Video' }: { id: string; title?: string }) {
  return (
    <Frame src={`https://www.youtube-nocookie.com/embed/${id}`} title={title} ratio="16 / 9" />
  );
}

export function SlideShare({ id, title = 'Presentation' }: { id: string; title?: string }) {
  return (
    <Frame
      src={`https://www.slideshare.net/slideshow/embed_code/key/${id}`}
      title={title}
      ratio="4 / 3"
    />
  );
}

export function GoogleForm({ id, title = 'Form' }: { id: string; title?: string }) {
  return (
    <Frame
      src={`https://docs.google.com/forms/d/e/${id}/viewform?embedded=true`}
      title={title}
      height={900}
    />
  );
}

export function MemberLandscape() {
  return (
    <Frame
      src="https://landscape.openapis.org/embed/embed.html?key=openapi-initiative-members&headers=false&category-header=false&category-in-subcategory=false&title-uppercase=false&title-alignment=left&title-font-family=sans-serif&title-font-size=13&style=clean&bg-color=%23ffffff&fg-color=%2315191c&item-modal=true&item-name=false&size=lg&items-alignment=center"
      title="OpenAPI Initiative members"
      height={720}
    />
  );
}

export function MailingListSignup() {
  return (
    <form
      action="https://openapi.groups.io/g/main/signup?u=2710220876248777454"
      method="post"
      target="_blank"
      className="my-8 flex flex-col gap-3 rounded-2xl bg-brand-card p-6 sm:flex-row"
    >
      <label htmlFor="mailing-list-email" className="sr-only">
        Email address
      </label>
      <input
        id="mailing-list-email"
        type="email"
        name="email"
        required
        placeholder="email address"
        className="flex-1 rounded-full border border-brand-separator bg-transparent px-5 py-3"
      />
      <button type="submit" className="btn-green">
        Join the mailing list
      </button>
    </form>
  );
}
