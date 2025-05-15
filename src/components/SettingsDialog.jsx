import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useDzikir } from "@/context/DzikirContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const SettingsDialog = ({ open, onOpenChange, openAbout }) => {
  const { settings, updateSettings } = useDzikir();

  const handleSwitchChange = (key) => {
    updateSettings({ [key]: !settings[key] });
  };

  const handleCountingMethodChange = (e) => {
    updateSettings({ countingMethod: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-describedby="settings-description">
        <DialogHeader>
          <DialogTitle>Pengaturan</DialogTitle>
          <p id="settings-description" className="text-sm text-muted-foreground">
            Sesuaikan pengaturan aplikasi dzikir sesuai preferensi Anda.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Tampilan</h3>

            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium">Tema</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="theme-light"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={() => updateSettings({ theme: 'light' })}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="theme-light" className="text-sm">
                  Terang
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="theme-dark"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={() => updateSettings({ theme: 'dark' })}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="theme-dark" className="text-sm">
                  Gelap
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="show-translation" className="text-sm">
                Tampilkan Terjemahan
              </label>
              <Switch
                id="show-translation"
                checked={settings.showTranslation}
                onCheckedChange={() => handleSwitchChange('showTranslation')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="show-latin" className="text-sm">
                Tampilkan Latin
              </label>
              <Switch
                id="show-latin"
                checked={settings.showLatin}
                onCheckedChange={() => handleSwitchChange('showLatin')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="show-source" className="text-sm">
                Tampilkan Sumber
              </label>
              <Switch
                id="show-source"
                checked={settings.showSource}
                onCheckedChange={() => handleSwitchChange('showSource')}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="show-swipe-indicator" className="text-sm">
                Tampilkan Petunjuk Swipe
              </label>
              <Switch
                id="show-swipe-indicator"
                checked={settings.showSwipeIndicator}
                onCheckedChange={() => handleSwitchChange('showSwipeIndicator')}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Metode Penghitung</h3>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="marker"
                  name="counting-method"
                  value="marker"
                  checked={settings.countingMethod === 'marker'}
                  onChange={handleCountingMethodChange}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="marker" className="text-sm">
                  Tandai Selesai (Sekali Klik)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="counter"
                  name="counting-method"
                  value="counter"
                  checked={settings.countingMethod === 'counter'}
                  onChange={handleCountingMethodChange}
                  className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="counter" className="text-sm">
                  Penghitung (Tambah/Kurang)
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Navigasi</h3>

            <div className="flex items-center justify-between">
              <label htmlFor="auto-next" className="text-sm">
                Otomatis ke Dzikir Berikutnya
              </label>
              <Switch
                id="auto-next"
                checked={settings.autoNext}
                onCheckedChange={() => handleSwitchChange('autoNext')}
              />
            </div>
          </div>


        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={openAbout}
            className="w-full sm:w-auto"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
            Tentang Aplikasi
          </Button>
          <Button
            onClick={() => {
              // Force save settings to localStorage
              try {
                localStorage.setItem('dzikirSettings', JSON.stringify(settings));
              } catch (error) {
                console.error('Error saving settings on dialog close:', error);
              }
              onOpenChange(false);
            }}
            className="w-full sm:w-auto"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
