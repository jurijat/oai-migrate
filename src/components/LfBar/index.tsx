import { withBasePath } from '@/lib/site';

export function LfBar() {
  return (
    <div className="bg-[#252525]">
      <div className="mx-auto max-w-content px-6 py-2">
        <a
          href="https://www.linuxfoundation.org/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <img
            src={withBasePath('/brand/lfprojects-banner.svg')}
            alt="The Linux Foundation Projects"
            width={1379}
            height={75}
            className="h-auto w-[270px] max-w-full"
          />
        </a>
      </div>
    </div>
  );
}
