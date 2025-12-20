import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useDzikir } from "@/context/DzikirContext";

const AboutDialog = ({ open, onOpenChange }) => {
  const { settings } = useDzikir();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tentang Aplikasi</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-muted-foreground">
          Informasi tentang aplikasi Daily Dzikr.
        </DialogDescription>


        <div className="space-y-4 py-2">
          <div className="text-center mb-3">
            <FontAwesomeIcon
              icon={faMoon}
              className="text-3xl text-primary dark:text-primary mb-1"
            />
            <h3 className="text-xl font-bold text-primary-600 dark:text-primary">
              Daily Dzikr
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Versi {settings.version}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-base mb-1">Tujuan</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Aplikasi ini dibuat untuk memudahkan umat Muslim dalam mengamalkan dzikir pagi dan petang sesuai dengan sunnah Rasulullah SAW.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-base mb-1">Fitur</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-0.5">
              <li>Dzikir pagi dan petang lengkap dengan terjemahan</li>
              <li>Penanda progress untuk memudahkan pelacakan</li>
              <li>Tema terang dan gelap</li>
              <li>Tampilan responsif untuk semua ukuran layar</li>
              <li>Navigasi dengan swipe, tombol, dan keyboard</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-1">Pengembang</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Dibuat dengan ❤️ oleh Febryan Ramadhan. Repo: <a href="https://github.com/Pepryan/dzikir-pagi-petang" className="text-primary-600 dark:text-primary">Github</a>.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
