"use client";
import Image from "next/image";

export function DysperseAd() {
  return (
    <div>
      <span className="opacity-60 text-xs">
        Made with &lt;3 by{" "}
        <a
          href="https://click.dysperse.com/XpY4XBi"
          target="_blank"
          className="underline"
        >
          Manu
        </a>
      </span>
      <p className="my-1">
        <span className="font-bold mb-2">
          Want to 🔒{" "}
          <u>
            <i>
              <b>lock in</b>
            </i>
          </u>{" "}
          and see your grades improve!? 📈📈
        </span>{" "}
        <br />
        There's a great productivity platform out there called Dysperse that can
        help you stay on top of your game.
      </p>

      <span className="my-2">
        <li>It's approved by IUSD ✅</li>
        <li>Automatically syncs assignments from Canvas 🔁</li>
        <li>
          <b>As seen on the El Vaquero! 📰🤠</b>
        </li>
      </span>

      <a
        href="https://click.dysperse.com/qU2SIVR"
        target="_blank"
        className="border flex items-center gap-2 p-3 py-0 rounded-md mt-2 bg-white dark:bg-neutral-950"
        style={{ textDecoration: "none" }}
      >
        <span className="block flex-1">
          <span className="opacity-60 text-xs">dysperse.com</span>
          <h3 className="mt-1 mb-0">You could have 25 hours in a day.</h3>
          <p className="mt-1 mb-0 opacity-60 text-xs">
            Productivity is your domain. Let #dysperse be the catalyst.
          </p>
        </span>
        <Image
          alt="dysperse"
          className="shrink-0"
          src="/dysperse.svg"
          width={50}
          height={50}
        />
      </a>
    </div>
  );
}

