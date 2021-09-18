module.exports = async (_client, thread) => {
    if (thread.isText()) return thread.join()
}