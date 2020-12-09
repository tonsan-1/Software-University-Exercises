class Article {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
        this._commentsCount = 1;
    }
    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`;
        } else if (this._likes.length === 1) {
            return `${this._likes[0]} likes this article!`
        } else {
            return `${this._likes[0]} and ${this._likes.length - 1} others like this article!`;
        }
    }

    like(username) {
        let currentUsername = this._likes.find(x => x === username);

        if (currentUsername) {
            throw new Error(`You can't like the same article twice!`);
        }
        if (currentUsername === this.creator) {
            throw new Error(`You can't like your own articles!`);
        }

        this._likes.push(username);

        return `${username} liked ${this.title}!`;
    }
    dislike(username) {
        let currentUsername = this._likes.find(x => x === username);

        if (!currentUsername) {
            throw new Error(`You can't dislike this article!`);
        }

        const index = this._likes.findIndex(currentUsername);

        this._likes.splice(index, 1);

        return `${username} disliked ${this.title}`;
    }
    comment(username, content, id) {
        let currentComment = this._comments.find(x => x.id === id);

        if (!currentComment || id === undefined) {
            this._comments.push({
                id: this._commentsCount++,
                username,
                content,
                replies: []
            })

            return `${username} commented on ${this.title}`
        }
        if (currentComment) {
            let currentReplyId = `${id}.${currentComment.replies.length + 1}`;

            currentComment.replies.push({
                id: currentReplyId,
                username,
                content
            })

            return "You replied successfully";
        }
    }
    toString(sortingType) {
        let result = `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:\n`;

        if (sortingType === "asc") {

            for (const comment of this._comments.sort((a, b) => a.id - b.id)) {
                result += `-- ${comment.id}. ${comment.username}: ${comment.content}\n`;

                for (const reply of comment.replies.sort((a, b) => a.id - b.id)) {
                    result += `--- ${reply.id}. ${reply.username}: ${reply.content}\n`;
                }
            }
        }

        if (sortingType === "desc") {
            for (const comment of this._comments.sort((a, b) => b.id - a.id)) {
                result += `-- ${comment.id}. ${comment.username}: ${comment.content}\n`;

                for (const reply of comment.replies.sort((a, b) => b.id - a.id)) {
                    result += `--- ${reply.id}. ${reply.username}: ${reply.content}\n`;
                }
            }
        }

        if (sortingType === "username") {
            for (const comment of this._comments.sort((a, b) => a.username.localeCompare(b.username))) {
                result += `-- ${comment.id}. ${comment.username}: ${comment.content}\n`;

                for (const reply of comment.replies.sort((a, b) => a.username.localeCompare(b.username))) {
                    result += `--- ${reply.id}. ${reply.username}: ${reply.content}\n`;
                }
            }
        }
        return result.trim();
    }
}