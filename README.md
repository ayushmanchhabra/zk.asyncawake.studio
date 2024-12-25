# sharelist.xyz

Share information without an intermediary.

## Design

When sharing information over the internet, the sender sends the info to a server which caches it in a data store. It is then forwarded to the receiver. In `shareist.xyz`, the information is stored in a Base64 string in the URL itself. There are physical limits to how much data can be stored in the URL which is yet to be seen

## References

Inspired by [How to store your app's entire state in the url](https://www.scottantipa.com/store-app-state-in-urls).

## Roadmap

- Move all styles to TailwindCSS.
- Add QR code support (https://github.com/zpao/qrcode.react).
- Add encryption and decryption support.
- Improve code coverage.

## License

MIT.
