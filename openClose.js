document.addEventListener('DOMContentLoaded', () => {
    new OpenClose({
        holders: '.target-selector',
        opener: '.opener-selector',
        close: '.close-selector',
        activeClass: 'active-class',
        finishClass: 'finish-class',
        classToBody: 'body-class',
        hideOnClickOutside: false,
    })
})

class OpenClose {
    constructor(params) {
        this.holders = document.querySelectorAll(params.holders)
        if (!this.holders.length) return

        this.opener = params.opener || '.js-opener'
        this.closeBtn = params.close || '.js-close'
        this.activeClass = params.activeClass || 'js-active'
        this.finishClass = params.finishClass || 'js-finished'
        this.hideOnClickOutside = params.hideOnClickOutside
        this.classToBody = params.classToBody

        this.attachEvents()
    }

    attachEvents() {
        this.holders.forEach((currentEl) => {
            const opener = currentEl.querySelector(this.opener)
            const closeBtn = currentEl.querySelector(this.closeBtn)
            
            if (!opener) return
            
            opener.addEventListener('click', (e) => {
                e.stopPropagation()
                e.preventDefault()

                if (currentEl.classList.contains(this.activeClass)) {
                    this.removeClass(currentEl)
                    if (this.finishClass) {
                        this.removeFinishClass(currentEl)
                    }
                } else {
                    this.addClass(currentEl)
                    if (this.finishClass) {
                        this.addFinishClass(currentEl)
                    }
                }

                if (this.hideOnClickOutside) {
                    this.holders.forEach((item) => {
                        if (item.classList.contains(this.activeClass) && item !== currentEl) {
                            this.removeClass(item)
                        }
                    })
                }
            })

            if (closeBtn) {
                closeBtn.addEventListener('click', (e) => {
                    e.preventDefault()
                    this.removeClass(currentEl)
                })
            }

            if (this.hideOnClickOutside) {
                document.addEventListener('click', (el) => {
                    if (el.target.classList.contains('js-open-modal') || !currentEl.contains(el.target)) {
                        this.removeClass(currentEl)
                    }
                })
            }
        })
    }

    addClass(e) {
        e.classList.add(this.activeClass)
        
        if (this.classToBody) {
            document.querySelector('body').classList.add(this.classToBody)
        }
    }

    removeClass(e) {
        e.classList.remove(this.activeClass)
        
        if (this.classToBody) {
            document.querySelector('body').classList.remove(this.classToBody)
        }
    }

    addFinishClass(e) {
        this.timeout = setTimeout(() => {
            if (e.classList.contains(this.activeClass)) {
                e.classList.add(this.finishClass)
            }
        }, 300)
    }

    removeFinishClass(e) {
        e.classList.remove(this.finishClass)
    }
}