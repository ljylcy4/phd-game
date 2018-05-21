import { GuiBase } from './guiBase';
import { HTMLTextRenderer } from './textRenderer';

interface PendingMessage {
    title: string;
    message: string;
    confirm: string;
    icon?: string;
}

export class GuiModalBox extends GuiBase<HTMLDivElement> {

    private _contentBox: HTMLDivElement;
    private _titleContainer: HTMLHeadingElement;
    private _messageContainer: HTMLDivElement;
    private _confirmBtn: HTMLAnchorElement;

    private _pending: Array<PendingMessage> = [];
    private _shown: boolean = false;

    constructor(container: HTMLDivElement, textRenderer: HTMLTextRenderer) {
        super(container, textRenderer);
        // Init components.
        this._contentBox = this.createAndAddChild('div', '', 'modal_content');
        this._titleContainer = document.createElement('h3');
        this._messageContainer = document.createElement('div');
        this._messageContainer.className = 'modal_message';
        this._confirmBtn = document.createElement('a');
        this._confirmBtn.className = 'btn_confirm btn';
        this._confirmBtn.href = 'javascript:void(0)';
        this._contentBox.appendChild(this._titleContainer);
        this._contentBox.appendChild(this._messageContainer);
        this._contentBox.appendChild(this._confirmBtn);
        this._confirmBtn.onclick = () => {
            if (this._pending.length > 0) {
                const m = <PendingMessage>this._pending.shift();
                this._setContent(m.title, m.message, m.confirm, m.icon);
            } else {
                this.setHidden(true);
                this._clearContent();
            }
        };
    }

    /**
     * Displays a message.
     * @param title Title.
     * @param message Message.
     * @param confirm Text for the confirm button.
     * @param icon (Optional) Path to the icon file (image file).
     */
    display(title: string, message: string, confirm: string, icon?: string): void {
        if (this._shown) {
            this._pending.push({
                title: title,
                message: message,
                confirm: confirm,
                icon: icon
            });
        } else {
            this._setContent(title, message, confirm, icon);
            this.setHidden(false);
        }
    }

    private _setContent(title: string, message: string, confirm: string, icon?: string): void {
        this._titleContainer.textContent = title;
        const p = document.createElement('p');
        p.innerHTML = message;
        this._messageContainer.appendChild(p);
        if (icon) {
            const img = document.createElement('img');
            img.src = icon;
            this._messageContainer.appendChild(img);
        }
        this._confirmBtn.textContent = confirm;
    }

    private _clearContent(): void {
        this._titleContainer.textContent = '';
        this._messageContainer.innerHTML = '';
        this._confirmBtn.textContent = '';
    }

}
