import Swal from "sweetalert2";

// helpers para detectar tipos
const isImageUrl = (url) => /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(url || "");
const isPdfUrl = (url) => /\.pdf$/i.test(url || "");

const pick = (obj, keys) => keys.map((k) => obj?.[k]).find((v) => v !== undefined && v !== null);

export function handleViewDoc(r) {
  // Soporta camelCase y PascalCase
  const url = pick(r, ["urlDocumento", "UrlDocumento"]);
  const type = (pick(r, ["documentoTipo", "DocumentoTipo"]) || "").toLowerCase();
  const nombre = pick(r, ["nombreApellido", "NombreApellido"]) || "";
  const codigo = pick(r, ["codigo", "Codigo"]) ?? "";

  if (!url) {
    Swal.fire({
      icon: "info",
      title: `Documento de ${nombre}`,
      text: "Este registro aún no tiene documento vinculado.",
      confirmButtonText: "Cerrar",
    });
    return;
  }

  const isImg = type.startsWith("image/") || isImageUrl(url);
  const isPdf = type === "application/pdf" || isPdfUrl(url);
//si es img
  const htmlImg = `
    <a href="${url}" target="_blank" rel="noopener">
      <img src="${url}" alt="Documento de ${nombre}"
           style="max-width: 520px; width: 100%; border-radius: 12px; cursor: zoom-in; box-shadow: 0 6px 24px rgba(0,0,0,.15);" />
    </a>
    <p style="margin-top:10px; color:#475569;">Código: ${codigo}</p>
  `;
//si es pdf

  const htmlPdf = `
    <div style="width:100%; max-width:900px;">
      <iframe src="${url}" style="width:100%; height:75vh; border:0; border-radius:8px; box-shadow: 0 6px 24px rgba(0,0,0,.15);" title="PDF"></iframe>
      <p style="margin-top:10px; color:#475569;">Código: ${codigo}</p>
    </div>
  `;
//si es pdf todo lo  otro

  const htmlFallback = `
    <p style="margin:0 0 6px;">No se puede previsualizar este tipo de archivo.</p>
    <a href="${url}" target="_blank" rel="noopener" style="text-decoration:underline;">Abrir en pestaña</a>
    <p style="margin-top:10px; color:#475569;">Código: ${codigo}</p>
  `;

  Swal.fire({
    title: `Documento de ${nombre}`,
    html: isImg ? htmlImg : isPdf ? htmlPdf : htmlFallback,
    showCancelButton: true,
    confirmButtonText: "Abrir en pestaña",
    cancelButtonText: "Cerrar",
    reverseButtons: true,
    width: isPdf ? 900 : "auto",
  }).then((res) => {
    if (res.isConfirmed) window.open(url, "_blank", "noopener");
  });
}

