import { withBasePath } from '@/lib/site';

export function LfBar() {
  return (
    <div className="bg-[#252525]">
      <div className="mx-auto flex h-[33px] max-w-content items-center px-6">
        <a
          href="https://www.linuxfoundation.org/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src={withBasePath('/brand/lfprojects-banner.svg')}
            alt="The Linux Foundation Projects"
            width={1379}
            height={75}
            className="block h-auto w-[270px] max-w-full"
          />
        </a>
      </div>
    </div>
  );
}
