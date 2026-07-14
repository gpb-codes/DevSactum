import 'dart:async';
import 'dart:convert';
import 'package:web_socket_channel/web_socket_channel.dart';

typedef MessageHandler = void Function(Map<String, dynamic> data);

class WebSocketClient {
  WebSocketChannel? _channel;
  final String url;
  final Map<String, List<MessageHandler>> _handlers = {};
  Timer? _pingTimer;

  WebSocketClient(this.url);

  void connect() {
    _channel = WebSocketChannel.connect(Uri.parse(url));
    _startPing();

    _channel!.stream.listen(
      (data) {
        final msg = jsonDecode(data as String);
        final type = msg['type'] as String?;
        if (type != null && _handlers.containsKey(type)) {
          for (final handler in _handlers[type]!) {
            handler(msg);
          }
        }
      },
      onDone: () {
        _pingTimer?.cancel();
        Future.delayed(const Duration(seconds: 3), connect);
      },
    );
  }

  void _startPing() {
    _pingTimer = Timer.periodic(const Duration(seconds: 30), (_) {
      _channel?.sink.add(jsonEncode({'type': 'ping'}));
    });
  }

  void on(String type, MessageHandler handler) {
    _handlers.putIfAbsent(type, () => []).add(handler);
  }

  void send(Map<String, dynamic> data) {
    _channel?.sink.add(jsonEncode(data));
  }

  void dispose() {
    _pingTimer?.cancel();
    _channel?.sink.close();
  }
}
