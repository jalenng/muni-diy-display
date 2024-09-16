import { useEffect, useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import { X } from "lucide-react";

function URLImportDialog({
  open,
  onClose,
  onImport,
}: {
  open: boolean;
  onClose: () => void;
  onImport: (url: string) => void;
}) {
  useEffect(() => {
    if (open) {
      setURL("");
    }
  }, [open]);

  const [url, setURL] = useState("");

  return (
    <dialog
      className="fixed top-0 bottom-0 left-0 right-0 bg-white p-4 drop-shadow-lg rounded"
      open={open}
    >
      <div className="flex flex-row overflow-hidden items-center gap-4">
        <label>Paste the URL you want to import</label>
        <Button isIconOnly onClick={() => onClose()}>
          <X size={16} />
        </Button>
      </div>

      <TextArea
        value={url}
        className="resize-none"
        rows={3}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        onChange={(e) => setURL(e.target.value)}
        showPasteButton
      />
      <div className="flex gap-2">
        <Button
          variant="primary"
          onClick={() => {
            onImport(url);
          }}
        >
          Import
        </Button>
      </div>
    </dialog>
  );
}

export default URLImportDialog;
