import { useMemo, useRef, useState } from "react";
import Logo from "../assets/muni-diy-display-plain.svg?react";
import Input from "../components/Config/Input";
import StepSection from "../components/Config/StepSection";
import Button from "../components/Config/Button";
import { usePreviewPaneSizing } from "../hooks/usePreviewPaneSizing";
import TextArea from "../components/Config/TextArea";
import URLImportDialog from "../components/Config/URLImportDialog";
import BannerImgSrc from "../assets/banner.jpg";

const API_KEY_REGEX =
  /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
const STOP_ID_REGEX = /^\d{5,5}$/;

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

  const previewURL = useMemo(
    () => (lastValidStepNumber > 2 ? resultURL : ""),
    [lastValidStepNumber, resultURL]
  );

  const parseURLToParams = (url: string) => {
    const hashRoute = new URL(url).hash;
    const [_, queryString] = hashRoute.split("?");
    return Object.fromEntries(new URLSearchParams(queryString));
  };

  return (
    <>
      <header className="bg-[#636667]">
        <nav className="flex flex-row">
          <a href="/" title="Home" className="flex items-stretch !no-underline">
            <div className="bg-[#BF2B45] flex items-center justify-center h-full aspect-square p-2">
              <Logo className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex items-center text-white text-[16px] px-4 font-bold bg-[#525657] sm:text-[22px]">
              Muni DIY Display
              <span className="uppercase text-[16px] font-bold bg-[#BF2B45] px-2 py-0 rounded-full ml-2">
                Beta
              </span>
            </div>
          </a>
        </nav>
      </header>

      {/* Banner */}
      <div className="relative overflow-hidden">
        {/* Image */}
        <img
          className="aspect-[1280/426] object-cover bg-[#D5D5D6] w-full h-full"
          src={BannerImgSrc}
        ></img>
        {/* Text container */}
        <div className="bg-[#7A7B7E] pl-1 pr-11 sm:absolute sm:left-0 sm:right-0 sm:top-0 sm:bg-transparent sm:top-[40%] sm:bottom-auto sm:p-0">
          <h1 className="font-bold text-white leading-[133%] max-w-[600px] p-2.5 text-[20px] sm:px-12 sm:text-[42px] sm:-translate-y-[40%] sm:text-shadow-title">
            Create your own Muni predictions and alerts display!
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-[32px] mt-8 mb-24 sm:mx-[112px]">
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

        <div className="flex gap-8 flex-col items-stretch md:flex-row">
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
                pattern={API_KEY_REGEX.source}
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
                pattern={STOP_ID_REGEX.source}
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
            className="grow basis-0 flex justify-center md:w-[40%]"
          >
            <div className="flex items-center md:sticky top-0 max-h-screen">
              <figure>
                <div
                  className="border border-[#d5d5d6]"
                  style={previewIframeWrapperStyles}
                >
                  <iframe
                    key={previewURL}
                    src={previewURL}
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
          setIsApiKeyValid(API_KEY_REGEX.test(apiKey));
          setStopId(stopId ?? "");
          setIsStopIdValid(STOP_ID_REGEX.test(stopId));
        }}
      />
    </>
  );
}

export default Config;
