# AYDA ÖSD A1 + A2 — YAYINLANMAMIŞ UX ÖNİZLEMESİ

Durum: **SADECE İNCELEME**. Canlı sitenin ana dalı (main) değiştirilmemiştir.
Kaynak: `main` dalının 19 Ekim 2026 tarihli hâli. İçerik ve resmî sınav görselleri korunur.

## Nasıl bakılır?

1. [Önizleme ZIP paketini indir](https://github.com/onurqlp/osda1rehber/archive/refs/heads/review/ux-a1-a2-20261019.zip).
2. ZIP'i **tamamen çıkart**. (İçindeki HTML dosyasını arşiv içinden açma.)
3. Çıkan klasördeki `index.html` dosyasını tarayıcıda aç.
4. A1 ve A2'yi ayrı ayrı gez. Görevin görseline bas, büyüt, tüm açıklamaları aç, öğrendim kutusunu işaretle.
5. Hem dar telefon hem de geniş bilgisayar ekranında değerlendir.

Telefonun yerel HTML açılmasını engelliyorsa bilgisayarda incele; bu sürüm çevrimiçi yayımlanmamıştır.

## Değişiklikler

- A1 ve A2'de ortak, sade öğretim ekranı
- Gerçek ÖSD model sayfası mobilde üstte; masaüstünde anlatımın yanında
- Görseller için 'sayfaya sığdır / yakınlaştır / uzaklaştır' kontrolü
- Görevde 2 kısa öğretmen adımı, diğer özgün açıklamalar açılır alanda
- Her görev için 'Bu görevi öğrendim' kutusu
- Bölüm ve ana ekranda toplam ilerleme göstergeleri
- Eski kontrol listesi, kaynaklar, örnekler, puanlama, navigasyon ve video alanları korunur
- Her düzeyin yeni ilerleme verisi ayrı localStorage anahtarıyla tutulur; cihazlar arasında senkronizasyon yok

## Teknik sınır

Önizlemede yapılan işaretlemeler, canlı siteye taşınmaz. Tarayıcı depolama izninin olmadığı ortamlarda kalıcı kayıt yapılamayabilir. ÖSD'nin resmî bağlantıları ve YouTube videoları internet gerektirir.

## Yayın kararı

Kullanıcının 'GO' onayı verilince ayrıca gözden geçirilecek. Bu inceleme dalı otomatik olarak siteye yayınlanmaz. `main` ile birleştirilmedikçe GitHub Pages canlı sürümü etkilenmez.
