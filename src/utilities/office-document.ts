import { marked } from "marked";
export async function getSelectedTextInWord(): Promise<string | number | null> {
  if (Office.context.host === Office.HostType.PowerPoint) {
    try {
      return await PowerPoint.run(async (context) => {
        const shapes = context.presentation.getSelectedShapes();
        shapes.load("items");
        await context.sync();

        if (shapes.items.length === 0) {
          return null;
        }

        const selectedShape = shapes.items[0];

        if (selectedShape.type === "Image") {
          return null;
        } else {
          selectedShape.textFrame.load("textRange,hasText");
          await context.sync();

          if (selectedShape.textFrame.hasText) {
            const textRange = selectedShape.textFrame.textRange;
            return textRange.text || null;
          } else {
            return null;
          }
        }
      });
    } catch (error) {
      console.error("Error in getSelectedShape:", error);
      return null;
    }
  } else if (Office.context.host === Office.HostType.Word) {
    try {
      return await Word.run(async (context) => {
        const range = context.document.getSelection();
        context.load(range, "text");
        await context.sync();

        const selectedText = range.text.trim();
        return selectedText || 201;
      });
    } catch (error) {
      console.error("Error in Word selection:", error);
      return null;
    }
  }

  // Default fallback if host is not PowerPoint or Word
  return null;
}

/**
 * Inserts HTML at the cursor position without replacing selected content.
 */
export async function insertHtmlAtCursor(content) {
  if (Office.context.host === Office.HostType.Outlook) {
    const htmlContent = await marked.parse(content); // Await the result

    return new Promise<void>((resolve, reject) => {
      if (Office.context.mailbox.item.body) {
        Office.context.mailbox.item.body.setAsync(
          htmlContent,
          { coercionType: Office.CoercionType.Html },
          function (asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
              resolve();
            } else {
              reject(asyncResult.error.message);
            }
          }
        );
      } else {
        reject("Outlook is not in compose mode.");
      }
    });
  } else if (Office.context.host === Office.HostType.PowerPoint) {
    return new Promise<void>((resolve, reject) => {
      PowerPoint.run(async (context) => {
        try {
          const shapes = context.presentation.getSelectedShapes();
          shapes.load("items");
          await context.sync();

          if (shapes.items.length === 0) {
            const slides = context.presentation.getSelectedSlides();
            slides.load("items");
            await context.sync();

            const targetSlide = slides.items.length > 0 ? slides.items[0] : context.presentation.slides.getItemAt(0);

            const newShape = targetSlide.shapes.addTextBox(content);
            newShape.left = 100;
            newShape.top = 100;

            await context.sync();
            resolve();
            return;
          }

          const selectedShape = shapes.items[0];

          if (selectedShape.textFrame) {
            const slides = context.presentation.getSelectedSlides();
            slides.load("items");
            await context.sync();

            const targetSlide = slides.items.length > 0 ? slides.items[0] : context.presentation.slides.getItemAt(0);
            const newShape = targetSlide.shapes.addTextBox(content);
            newShape.left = 100;
            newShape.top = 100;
            newShape.width = 800;

            await context.sync();
            resolve();
          } else {
            reject("Selected shape is not a text shape.");
          }
        } catch (error) {
          reject(`An error occurred: ${error}`);
        }
      });
    });
  } else if (Office.context.host === Office.HostType.Word) {
    return Word.run(async (context) => {
      const htmlContent = await marked.parse(content); // Await the result

      const selection = context.document.getSelection();
      selection.insertHtml(htmlContent, Word.InsertLocation.end);
      await context.sync();
    });
  } else {
    // Fallback in case host is unsupported
    return Promise.reject("Unsupported Office host.");
  }
}

/**
 * Replaces selected content with HTML.
 */
export async function replaceSelectedWithHtml(content) {
  if (Office.context.host === Office.HostType.PowerPoint) {
    return new Promise<void>((resolve, reject) => {
      PowerPoint.run(async (context) => {
        try {
          const shapes = context.presentation.getSelectedShapes();
          shapes.load("items");
          await context.sync();

          const selectedShape = shapes.items[0];

          if (selectedShape.textFrame) {
            selectedShape.textFrame.load("textRange");
            await context.sync();

            selectedShape.textFrame.textRange.text = content;

            await context.sync();
            resolve();
          } else {
            reject("Selected shape is not a text-containing shape.");
          }
        } catch (error) {
          reject(`An error occurred: ${error}`);
        }
      });
    });
  } else if (Office.context.host === Office.HostType.Word) {
    // This is now a string, not JSX

    return Word.run(async (context) => {
      const htmlContent = await marked.parse(content); // Await the result
      const selection = context.document.getSelection();
      selection.insertHtml(htmlContent, Word.InsertLocation.replace);
      await context.sync();
    });
  } else {
    return Promise.reject("Unsupported Office host.");
  }
}
