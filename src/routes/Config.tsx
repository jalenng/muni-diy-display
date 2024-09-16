import { useMemo, useRef, useState } from "react";
import Logo from "../assets/muni-diy-display-plain.svg?react";
import Input from "../components/Config/Input";
import StepSection from "../components/Config/StepSection";
import Button from "../components/Config/Button";
import { usePreviewPaneSizing } from "../hooks/usePreviewPaneSizing";
import TextArea from "../components/Config/TextArea";
import URLImportDialog from "../components/Config/URLImportDialog";

function Config() {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyValid, setIsApiKeyValid] = useState(false);
  const [stopId, setStopId] = useState("");
  const [isStopIdValid, setIsStopIdValid] = useState(false);

  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const resultURL = useMemo(() => {
    const searchParams = new URLSearchParams();
    if (apiKey) {
      searchParams.append("apiKey", apiKey);
    }
    if (stopId) {
      searchParams.append("stopId", stopId);
    }
    return `${window.location.href}#sign?${searchParams.toString()}`;
  }, [apiKey, stopId]);

  const previewContainerRef = useRef(null);
  const { previewIframeWrapperStyles, previewIframeStyles } =
    usePreviewPaneSizing(previewContainerRef, { y: 32 });

  const lastValidStepNumber = useMemo(() => {
    const testVals = [true, isApiKeyValid, isStopIdValid];
    const indexOfFirstFailedTest = testVals.findIndex((val) => !val);
    return indexOfFirstFailedTest > 0
      ? indexOfFirstFailedTest
      : testVals.length;
  }, [isApiKeyValid, isStopIdValid]);

  const parseURLToParams = (url: string) => {
    const hashRoute = new URL(url).hash;
    const [_, queryString] = hashRoute.split("?");
    return Object.fromEntries(new URLSearchParams(queryString));
  };

  return (
    <>
      <header className="bg-[#636667] h-14">
        <nav className="flex flex-row">
          <a href="/" title="Home" className="flex items-stretch !no-underline">
            <div className="bg-[#BF2B45] flex items-center justify-center w-14 h-14">
              <Logo className="w-8 h-8" />
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
          <h2 className="font-bold text-[26px] pt-1 pb-3 border-b my-3">
            Configure your Display
          </h2>
        </div>

        <div className="bg-[#f6f6f7] px-4 py-3 flex justify-between items-center rounded border border-[#e3e3e3]">
          <div className="overflow-hidden text-ellipsis grow">
            Already have a link you want to update?
          </div>
          <Button
            type="secondary"
            className="ml-2"
            onClick={() => setIsImportDialogOpen(true)}
          >
            Import it here
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Left side */}
          <div className="grow basis-0">
            <StepSection
              number="1"
              header="Get 311 API key"
              isDisabled={lastValidStepNumber < 1}
            >
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
                required
                minLength={36}
                maxLength={36}
                pattern="[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}"
                showPasteButton
                onChange={(e) => {
                  setIsApiKeyValid(e.target.validity.valid);
                  setApiKey(e.target.value);
                }}
              />
            </StepSection>

            <StepSection
              number="2"
              header="Select your stop"
              isDisabled={lastValidStepNumber < 2}
            >
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
                minLength={5}
                maxLength={5}
                required
                pattern="\d{5,5}"
                showPasteButton
                onChange={(e) => {
                  setIsStopIdValid(e.target.validity.valid);
                  setStopId(e.target.value);
                }}
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

            <StepSection
              number="3"
              header="Get your URL"
              isDisabled={lastValidStepNumber < 3}
            >
              <TextArea
                value={resultURL}
                readOnly={true}
                className="resize-none"
                rows={3}
                showCopyButton
              />
            </StepSection>
          </div>

          {/* Right side: preview */}
          <div
            ref={previewContainerRef}
            className="grow basis-0 flex justify-center w-[40%]"
          >
            <div className="flex items-center sticky top-0 max-h-screen">
              <figure>
                <div
                  className="border border-[#d5d5d6]"
                  style={previewIframeWrapperStyles}
                >
                  <iframe
                    key={resultURL}
                    src={resultURL}
                    style={previewIframeStyles}
                  ></iframe>
                </div>
                <figcaption className="text-[#636667] text-center mt-1">
                  Preview
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#484848] to-[#2E2E2E] pt-10 pb-8"></footer>

      <URLImportDialog
        open={isImportDialogOpen}
        onClose={() => {
          setIsImportDialogOpen(false);
        }}
        onImport={(url) => {
          setIsImportDialogOpen(false);
          const { apiKey, stopId } = parseURLToParams(url);
          setApiKey(apiKey ?? "");
          setStopId(stopId ?? "");
        }}
      />
    </>
  );
}

export default Config;
