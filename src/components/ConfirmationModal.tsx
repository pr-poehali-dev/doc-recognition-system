import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (comment: string) => void;
}

export function ConfirmationModal({ open, onOpenChange, onConfirm }: ConfirmationModalProps) {
  const handleConfirm = () => {
    const textarea = document.querySelector('textarea');
    onConfirm(textarea?.value || '');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <Icon name="Gift" size={24} />
            Подарочная коробка
          </DialogTitle>
          <p className="text-sm text-slate-400 mt-1">Упаковщик подарков</p>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-sm font-medium">
                  А
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-300">Администратор</span>
                  <span className="text-xs text-slate-500">15:08</span>
                </div>
                <div className="text-sm text-slate-200 bg-slate-700 rounded-lg px-4 py-3">
                  aaaaaaaaaaaaaaaaaa
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <Textarea
              placeholder="Введите сообщение..."
              className="min-h-[100px] bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Отмена
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Готово
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
