import { type Company } from "../types";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  company: Company | null;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  company,
}: DeleteModalProps) => {
  if (!isOpen) return null; // Don't render anything if closed

  return (
    // 1. The Overlay (Fixed, covers everything)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* 2. The Modal Content Box */}
      <div
        role="alertdialog"
        className="w-full max-w-md bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200"
      >
        {/* 3. The Warning Header */}
        <h2 className="text-3xl font-black uppercase mb-2">Confirm_Deletion</h2>

        {/* 4. The Message */}
        <p className="font-bold text-zinc-600 mb-8">
          Are you sure you want to remove{" "}
          <span className="text-black underline">{company?.name}</span>? This action
          cannot be undone.
        </p>

        {/* 5. The Actions Bar (Flexbox) */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white font-black py-4 uppercase border-4 border-black hover:bg-red-700 active:translate-y-1 transition-all"
          >
            Delete_Entry
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-zinc-200 text-black font-black py-4 uppercase border-4 border-black hover:bg-zinc-300 active:translate-y-1 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
