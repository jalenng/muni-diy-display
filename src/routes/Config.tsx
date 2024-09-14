import { useCallback, useMemo, useState } from "react";
import Input from "../components/Config/Input";
import StepSection from "../components/Config/StepSection";
import Button from "../components/Config/Button";

function Config() {
  const [apiKey, setApiKey] = useState("");
  const [stopId, setStopId] = useState("");

  const getSearchParamsStr = useCallback(
    (isPreview = false) => {
      const searchParams = new URLSearchParams();
      if (apiKey) {
        searchParams.append("apiKey", apiKey);
      }
      if (stopId) {
        searchParams.append("stopId", stopId);
      }
      if (isPreview) {
        searchParams.append("preview", isPreview.toString());
      }
      return searchParams;
    },
    [apiKey, stopId]
  );

  const resultURL = useMemo(() => {
    return {
      actualURL: `${window.location.origin}/#sign?${getSearchParamsStr()}`,
      previewURL: `${window.location.origin}/#sign?${getSearchParamsStr(true)}`,
    };
  }, [getSearchParamsStr]);

  return (
    <>
      <header className="bg-[#636667] h-14">
        <nav className="flex flex-row">
          <a href="/" title="Home" className="flex items-stretch">
            <div className="bg-[#BF2B45] flex items-center justify-center w-14 h-14">
              <img src="/muni-diy-display-plain.svg" className="w-8 h-8" />
            </div>
            <div className="flex items-center text-white text-[22px] px-4 font-bold bg-[#525657]">
              Muni DIY Display
              <span className="uppercase text-[16px] font-bold bg-[#BF2B45] px-2 py-0 rounded-full ml-2">
                Beta
              </span>
            </div>
          </a>
        </nav>
      </header>

      {/* Banner */}
      <div className="aspect-[1280/426] px-12 flex items-center bg-[#D5D5D6]">
        <h1
          className="font-bold text-[42px] text-white leading-[133%] max-w-[600px]"
          style={{
            textShadow:
              "0px 4px 4px rgba(0, 0, 0, 0.25), -3px 3px 6px rgba(0, 0, 0, 0.6), 3px -3px 6px rgba(0, 0, 0, 0.56), -3px -3px 6px rgba(0, 0, 0, 0.6)",
          }}
        >
          Create your own Muni predictions and alerts display!
        </h1>
      </div>

      {/* Main content */}
      <div className="mx-[112px] mt-8 mb-24">
        <div>
          <h2 className="font-bold text-[26px] pt-1 pb-4 border-b my-1">
            Configure your Display
          </h2>
        </div>

        <div className="flex gap-8">
          {/* Left side */}
          <div className="grow basis-0">
            <StepSection number="1" header="Get 311 API key">
              <p>
                Request a free new 311 API token from the link below, then paste
                it here.
              </p>
              <p>
                <a
                  href="https://511.org/open-data/token"
                  target="_blank"
                  rel="noopener"
                >
                  https://511.org/open-data/token
                </a>
              </p>
              <Input
                type="text"
                placeholder="e.g. 8318cb6e-ecc7-4d45-b771-42d432af3555"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </StepSection>

            <StepSection number="2" header="Select your stop">
              <p>
                Use the link below to find your five-digit stop ID number, then
                paste it here.
              </p>
              <p>
                <a
                  href="https://www.sfmta.com/find-a-stop"
                  target="_blank"
                  rel="noopener"
                >
                  https://www.sfmta.com/find-a-stop
                </a>
              </p>
              <Input
                type="text"
                placeholder="e.g. 12345"
                value={stopId}
                onChange={(e) => setStopId(e.target.value)}
              />
            </StepSection>

            {/* <div>
            <h3 className="font-bold text-[22px] py-1">
              <span className="inline-flex items-center justify-center bg-[#BF2B45] rounded-full text-white min-w-9 min-h-9 mr-3">
                3
              </span>
              Customize your sign
            </h3>
          </div> */}

            <StepSection number="3" header="Get your URL">
              <Input
                type="text"
                value={resultURL.actualURL}
                readonly="readonly"
              />
              <div className="flex gap-2">
                <Button
                  isPrimary
                  onClick={() =>
                    navigator.clipboard.writeText(resultURL.actualURL)
                  }
                >
                  Copy
                </Button>
                <Button
                  onClick={() => window.open(resultURL.actualURL, "_blank")}
                >
                  Preview
                </Button>
              </div>
            </StepSection>
          </div>

          {/* Right side: preview */}
          <div className="grow basis-0 flex flex-col items-center justify-center">
            <figure>
              <iframe
                key={resultURL.previewURL}
                src={resultURL.previewURL}
                className="w-[360px] h-[230px] border border-[#d5d5d6]"
              ></iframe>
              <figcaption className="text-[#636667] text-center">
                Preview
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#484848] to-[#2E2E2E] pt-10 pb-8"></footer>
    </>
  );
}

export default Config;
