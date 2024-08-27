import PdfPrinter from "pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import type { ProjectWithComputedValues } from "./projects";

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique",
  },
};

export function projectToPdf(fullProject: ProjectWithComputedValues) {
  const printer = new PdfPrinter(fonts);

  const headers = ["", "Kroppsmått", "+/-", "Inkl. rörelsev.", "Konstruktionsmått"];

  const docDefinition: TDocumentDefinitions = {
    header: { text: new Date().toLocaleString(), alignment: "right", margin: [0, 20, 20, 0] },
    content: [
      { text: fullProject.name, style: "header" },
      {
        style: "table",
        table: {
          body: [
            ["Rörelsevidd", "Storlek", "Ärm"].map((val) => ({
              text: val,
              style: "tableHeader",
            })),
            [fullProject.ease, fullProject.size, fullProject.isLongSleeve ? "Lång" : "Kort"],
          ],
        },
      },
      {
        style: "table",
        table: {
          body: [
            headers.map((val) => ({ text: val, style: "tableHeader" })),
            ...fullProject.fields.map(
              ({ name, base, allowance, withEase, constructionMeasurement }) => [
                name,
                (base ?? " ").toString(),
                (allowance ?? " ").toString(),
                (withEase ?? " ").toString(),
                (constructionMeasurement ?? " ").toString(),
              ],
            ),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 30, 30, 0],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      table: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      font: "Helvetica",
      // alignment: 'justify'
    },
  };

  const options = {};

  const doc = printer.createPdfKitDocument(docDefinition, options);
  doc.end();
  return doc;
}
