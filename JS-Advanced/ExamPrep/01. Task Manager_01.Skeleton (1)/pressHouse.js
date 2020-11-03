function solveClasses() {
    class Article {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            let result = `Title: ${this.title}`;
            result += `\n`;
            result += `Content: ${this.content}`;

            return result;
        }
    }
    class ShortReports extends Article {
        comments = [];
        constructor(title, content, originalResearch) {
            super(title, content);

            this.OriginalResearch = originalResearch;
        }

        get content() {
            return super.content;
        }
        set content(value) {
            if (value.length > 150) {
                throw new Error('Short reports content should be less then 150 symbols.');
            }

            super.content = value;
        }
        get OriginalResearch() {
            return this.originalResearch;
        }
        set OriginalResearch(value) {
            if (Object.keys(value).length < 2) {
                throw new Error(`The original research should have author and title.`);
            }

            this.originalResearch = value;
        }

        addComment(comment) {
            this.comments.push(comment);

            return 'The comment is added.';
        }
        toString() {
            let result = super.toString();
            result += '\n';

            result += `Original Research: ${this.OriginalResearch.title} by ${this.OriginalResearch.author}`;

            if (this.comments.length > 0) {
                result += '\n';

                result += 'Comments:';

                this.comments.forEach(comment => {
                    result += '\n';
                    result += `${comment}`;
                });
            }


            return result;
        }
    }
    class BookReview extends Article {
        clients = [];

        constructor(title, content, book) {
            super(title, content);

            this.book = book;
        }
        addClient(clientName, orderDescription) {
            let order = this.clients.find(x => x.clientName == clientName && x.orderDescription == orderDescription);

            if (order) {
                throw new Error('This client has already ordered this review.');
            }

            this.clients.push({ clientName, orderDescription });

            return `${clientName} has ordered a review for ${this.book.name}`;
        }
        toString() {
            let result = super.toString();
            result += '\n';

            result += `Book: ${this.book.name}`;
            result += '\n';

            if (this.clients.length > 0) {
                result += 'Orders:'
                result += '\n';

                if (this.clients.length > 0) {
                    this.clients.forEach(order => {
                        result += `${order.clientName} - ${order.orderDescription}`;
                        result += '\n';
                    });
                }
            }

            return result.trim();
        }

    }

    return {
        Article,
        ShortReports,
        BookReview,
    }
}

let classes = solveClasses();
let short = new classes.ShortReports("SpaceX and Javascript", "Yes, its damn true.SpaceX in its recent launch Dragon 2 Flight has used a technology based on Chromium and Javascript. What are your views on this ?Yes, its damn true.SpaceX in its recent launch Dragon 2 Flight has used a technology based on Chromium and Javascript. What are your views on this ?", { title: "Dragon 2", author: "wikipedia.org" });
