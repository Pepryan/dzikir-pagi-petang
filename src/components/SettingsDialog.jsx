import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useDzikir, DEFAULT_SETTINGS } from "@/context/DzikirContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { downloadBackup, restoreBackup } from "@/lib/backup";

const SettingsDialog = ({ open, onOpenChange, openAbout }) => {
  const { settings, updateSettings } = useDzikir();
  const importInputRef = useRef(null);
  const [backupMessage, setBackupMessage] = useState(null);

  const handleImport = async (e) => {
    const file = e.target.files[0];
    e.target.value = ''; // allow picking the same file again
    if (!file) return;
    if (!window.confirm('Data statistik, pengaturan, progress Al-Quran, dan doa favorit akan diganti dengan isi file cadangan. Lanjutkan?')) return;

    try {
      const restored = restoreBackup(JSON.parse(await file.text()));
      // Apply imported settings to the running app too, otherwise the next auto-save would overwrite them
      if (restored.dzikirSettings) {
        const importedSettings = { ...restored.dzikirSettings };
        delete importedSettings.version; // keep the running app's version
        updateSettings(importedSettings);
      }
      setBackupMessage('✅ Data berhasil dipulihkan');
    } catch (error) {
      console.error('Error importing backup:', error);
      setBackupMessage('❌ File cadangan tidak valid');
    }
  };

  const handleSwitchChange = (key) => {
    updateSettings({ [key]: !settings[key] });
  };

  const handleCountingMethodChange = (e) => {
    updateSettings({ countingMethod: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] sm:h-auto max-h-screen sm:max-h-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pengaturan</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Pengaturan aplikasi dzikir untuk menyesuaikan tampilan dan preferensi
        </DialogDescription>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Tampilan</h3>

            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1.5">Tema</h4>
              <div className="grid grid-cols-2 gap-2">
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

          <div className="space-y-2">
            <h3 className="font-medium text-lg">Metode Penghitung</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

          <div className="space-y-2">
            <h3 className="font-medium text-lg">Font Arabic</h3>
            <div className="space-y-2">
              <div>
                <label htmlFor="font-size" className="text-sm font-medium mb-1.5 block">Ukuran Font</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    id="font-size"
                    min="20"
                    max="40"
                    step="1"
                    value={settings.arabicFontSize}
                    onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-sm font-medium w-12 text-center">{settings.arabicFontSize}px</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="font-amiri"
                    name="arabic-font"
                    value="Amiri Quran"
                    checked={settings.arabicFont === 'Amiri Quran'}
                    onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="font-amiri" className="text-sm">
                    Amiri Quran
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="font-scheherazade"
                    name="arabic-font"
                    value="Scheherazade New"
                    checked={settings.arabicFont === 'Scheherazade New'}
                    onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="font-scheherazade" className="text-sm">
                    Scheherazade New
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="font-noto-naskh"
                    name="arabic-font"
                    value="Noto Naskh Arabic"
                    checked={settings.arabicFont === 'Noto Naskh Arabic'}
                    onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="font-noto-naskh" className="text-sm">
                    Noto Naskh Arabic
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="font-playpen-sans"
                    name="arabic-font"
                    value="Playpen Sans"
                    checked={settings.arabicFont === 'Playpen Sans'}
                    onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="font-playpen-sans" className="text-sm">
                    Playpen Sans
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="font-lateef"
                    name="arabic-font"
                    value="Lateef"
                    checked={settings.arabicFont === 'Lateef'}
                    onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="font-lateef" className="text-sm">
                    Lateef
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="font-harmattan"
                    name="arabic-font"
                    value="Harmattan"
                    checked={settings.arabicFont === 'Harmattan'}
                    onChange={(e) => updateSettings({ arabicFont: e.target.value })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="font-harmattan" className="text-sm">
                    Harmattan
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-lg">Navigasi</h3>

              <div className="flex items-center justify-between gap-4">
                <label htmlFor="auto-tab-by-time" className="text-sm">
                  Pilih Pagi/Petang Otomatis Sesuai Jam
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Pagi 03.00–14.59, Petang 15.00–02.59
                  </span>
                </label>
                <Switch
                  id="auto-tab-by-time"
                  checked={settings.autoTabByTime}
                  onCheckedChange={() => handleSwitchChange('autoTabByTime')}
                />
              </div>

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
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-lg">Data & Cadangan</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Simpan statistik, pengaturan, progress Al-Quran, dan doa favorit ke file, lalu pulihkan di perangkat lain.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => { downloadBackup(); setBackupMessage(null); }}>
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Ekspor Data
            </Button>
            <Button variant="outline" onClick={() => importInputRef.current?.click()}>
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Impor Data
            </Button>
          </div>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImport}
            className="hidden"
            aria-label="Pilih file cadangan"
          />
          {backupMessage && <p className="text-sm">{backupMessage}</p>}
        </div>

        <DialogFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
          {/* Reset Settings Button */}
          <Button
            variant="outline"
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin mengembalikan pengaturan ke default?')) {
                updateSettings(DEFAULT_SETTINGS);
              }
            }}
            className="w-full sm:w-auto"
          >
            Reset ke Default
          </Button>
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
