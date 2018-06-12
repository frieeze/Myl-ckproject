import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class ConstellationService {

  constructor() { }

  constellationConsumer(){
    var constellationProxy = {
      constellationClient: null,
      onConnectionStateChangedCallback: null,
      initializeClient: function (serverUri, accessKey, friendlyName) {
        constellationProxy.constellationClient = $.signalR.createConstellationConsumer(serverUri, accessKey, friendlyName);
        constellationProxy.constellationClient.connection.stateChanged(function (change) {
          if (constellationProxy.onConnectionStateChangedCallback != null) {
            constellationProxy.onConnectionStateChangedCallback(change);
          }
        });
      },
      connect: function () {
        constellationProxy.constellationClient.connection.start();
      },
      disconnect: function () {
        constellationProxy.constellationClient.connection.stop();
      },
      onConnectionStateChanged: function (callback) {
        constellationProxy.onConnectionStateChangedCallback = callback;
      },
      onReceiveMessage: function (callback) {
        return constellationProxy.constellationClient.client.onReceiveMessage(callback);
      },
      registerMessageCallback: function (messageKey, callback) {
        return constellationProxy.constellationClient.client.registerMessageCallback(messageKey, callback);
      },
      sendMessage: function (scope, key, data) {
        var args = $.makeArray(arguments);
        var msgArgs = args.slice(2);
        if (msgArgs.length == 1) {
          msgArgs = msgArgs[0];
        }
        // Send message
        return constellationProxy.constellationClient.server.sendMessage(scope, key, msgArgs);
      },
      sendMessageWithSaga: function (callback, scope, key, data) {
        var args = $.makeArray(arguments);
        // Get the saga's callback
        var cb = callback;
        var msgArgs = args.slice(3);
        if (typeof cb !== "function" && typeof args[args.length - 1] === "function") {
          // Backward compatibility (< 1.8.2) where the saga's callback was the last parameter
          cb = args[args.length - 1];
          msgArgs = args.slice(2, args.length - 1);
          scope = args[0];
          key = args[1];
        }
        if (msgArgs.length == 1) {
          msgArgs = msgArgs[0];
        }
        // Send the message with saga
        return constellationProxy.constellationClient.server.sendMessageWithSaga(cb, scope, key, msgArgs);
      },
      subscribeMessages: function (group) {
        return constellationProxy.constellationClient.server.subscribeMessages(group);
      },
      onUpdateStateObject: function (callback) {
        return constellationProxy.constellationClient.client.onUpdateStateObject(callback);
      },
      registerStateObjectLink: function (sentinelName, packageName, name, type, callback) {
        return constellationProxy.constellationClient.client.registerStateObjectLink(sentinelName, packageName, name, type, callback);
      },
      requestStateObjects: function (sentinelName, packageName, name, type) {
        return constellationProxy.constellationClient.server.requestStateObjects(sentinelName, packageName, name, type);
      },
      subscribeStateObjects: function (sentinelName, packageName, name, type) {
        return constellationProxy.constellationClient.server.subscribeStateObjects(sentinelName, packageName, name, type);
      },
      unSubscribeMessages: function (group) {
        return constellationProxy.constellationClient.server.unSubscribeMessages(group);
      },
      unSubscribeStateObjects: function (sentinelName, packageName, name, type) {
        return constellationProxy.constellationClient.server.unSubscribeStateObjects(sentinelName, packageName, name, type);
      },
      requestSubscribeStateObjects: function (sentinelName, packageName, name, type) {
        return constellationProxy.constellationClient.server.requestSubscribeStateObjects(sentinelName, packageName, name, type);
      },
    };
    return constellationProxy;
  }

  constellationController(){
    var constellationProxy = {
      constellationClient: null,
      onConnectionStateChangedCallback: null,
      initializeClient: function (serverUri, accessKey, friendlyName) {
        constellationProxy.constellationClient = $.signalR.createConstellationController(serverUri, accessKey, friendlyName);
        constellationProxy.constellationClient.connection.stateChanged(function (change) {
          if (constellationProxy.onConnectionStateChangedCallback != null) {
            constellationProxy.onConnectionStateChangedCallback(change);
          }
        });
      },
      connect: function () {
        constellationProxy.constellationClient.connection.start();
      },
      disconnect: function () {
        constellationProxy.constellationClient.connection.stop();
      },
      onConnectionStateChanged: function (callback) {
        constellationProxy.onConnectionStateChangedCallback = callback;
      },
      onReceiveLogMessage: function (callback) {
        return constellationProxy.constellationClient.client.onReceiveLogMessage(callback);
      },
      onUpdateSentinel: function (callback) {
        return constellationProxy.constellationClient.client.onUpdateSentinel(callback);
      },
      onUpdateSentinelsList: function (callback) {
        return constellationProxy.constellationClient.client.onUpdateSentinelsList(callback);
      },
      onReportPackageState: function (callback) {
        return constellationProxy.constellationClient.client.onReportPackageState(callback);
      },
      onReportPackageUsage: function (callback) {
        return constellationProxy.constellationClient.client.onReportPackageUsage(callback);
      },
      onUpdatePackageList: function (callback) {
        return constellationProxy.constellationClient.client.onUpdatePackageList(callback);
      },
      onUpdatePackageDescriptor: function (callback) {
        return constellationProxy.constellationClient.client.onUpdatePackageDescriptor(callback);
      },
      addToControlGroup: function (group) {
        return constellationProxy.constellationClient.server.addToControlGroup(group);
      },
      purgeStateObjects: function (sentinelName, packageName, name, type) {
        return constellationProxy.constellationClient.server.purgeStateObjects(sentinelName, packageName, name, type);
      },
      reloadServerConfiguration: function (deployConfiguration) {
        return constellationProxy.constellationClient.server.reloadServerConfiguration(deployConfiguration);
      },
      reload: function (sentinelName, packageName) {
        return constellationProxy.constellationClient.server.reload(sentinelName, packageName);
      },
      removeToControlGroup: function (group) {
        return constellationProxy.constellationClient.server.removeToControlGroup(group);
      },
      requestPackageDescriptor: function (packageName) {
        return constellationProxy.constellationClient.server.requestPackageDescriptor(packageName);
      },
      requestPackagesList: function (sentinelName) {
        return constellationProxy.constellationClient.server.requestPackagesList(sentinelName);
      },
      requestSentinelUpdates: function () {
        return constellationProxy.constellationClient.server.requestSentinelUpdates();
      },
      requestSentinelsList: function () {
        return constellationProxy.constellationClient.server.requestSentinelsList();
      },
      restart: function (sentinelName, packageName) {
        return constellationProxy.constellationClient.server.restart(sentinelName, packageName);
      },
      start: function (sentinelName, packageName) {
        return constellationProxy.constellationClient.server.start(sentinelName, packageName);
      },
      stop: function (sentinelName, packageName) {
        return constellationProxy.constellationClient.server.stop(sentinelName, packageName);
      },
      updatePackageSettings: function (sentinelName, packageName) {
        return constellationProxy.constellationClient.server.updatePackageSettings(sentinelName, packageName);
      }
    };
    return constellationProxy;
  }
}
