import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Option "mo:core/Option";
import Int "mo:core/Int";

actor {
  include MixinStorage();

  type CommissionStatus = {
    #pending;
    #reviewed;
    #completed;
  };

  type CommissionRequest = {
    id : Text;
    name : Text;
    email : Text;
    commissionType : Text;
    referencePhotoUrl : ?Text;
    message : ?Text;
    status : CommissionStatus;
    photoRef : ?Storage.ExternalBlob;
    submittedAt : Time.Time;
  };

  module CommissionRequest {
    public func compare(a : CommissionRequest, b : CommissionRequest) : Order.Order {
      Int.compare(b.submittedAt, a.submittedAt);
    };
  };

  type ContactMessage = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  let commissionRequests = List.empty<CommissionRequest>();
  let contactMessages = List.empty<ContactMessage>();

  public shared ({ caller }) func submitCommissionRequest(
    name : Text,
    email : Text,
    commissionType : Text,
    referencePhotoUrl : ?Text,
    message : ?Text,
    photoRef : ?Storage.ExternalBlob
  ) : async Text {
    let id = commissionRequests.size().toText() # (Time.now().toText());
    let newRequest : CommissionRequest = {
      id;
      name;
      email;
      commissionType;
      referencePhotoUrl;
      message;
      status = #pending;
      photoRef;
      submittedAt = Time.now();
    };

    commissionRequests.add(newRequest);
    id;
  };

  public shared ({ caller }) func submitContactMessage(
    name : Text,
    email : Text,
    message : Text
  ) : async Text {
    let id = contactMessages.size().toText() # (Time.now().toText());
    let newMessage : ContactMessage = {
      id;
      name;
      email;
      message;
      submittedAt = Time.now();
    };

    contactMessages.add(newMessage);
    id;
  };

  public query ({ caller }) func getAllCommissionRequests() : async [CommissionRequest] {
    commissionRequests.toArray().sort();
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    contactMessages.toArray().sort(
      func(a, b) {
        Int.compare(b.submittedAt, a.submittedAt);
      }
    );
  };

  public shared ({ caller }) func updateCommissionStatus(requestId : Text, newStatus : CommissionStatus) : async () {
    let updatedList = List.empty<CommissionRequest>();
    var found = false;

    for (request in commissionRequests.values()) {
      if (request.id == requestId) {
        let updatedRequest = {
          id = request.id;
          name = request.name;
          email = request.email;
          commissionType = request.commissionType;
          referencePhotoUrl = request.referencePhotoUrl;
          message = request.message;
          status = newStatus;
          photoRef = request.photoRef;
          submittedAt = request.submittedAt;
        };
        updatedList.add(updatedRequest);
        found := true;
      } else {
        updatedList.add(request);
      };
    };

    if (not found) {
      Runtime.trap("Request with id " # requestId # " not found");
    } else {
      commissionRequests.clear();
      for (request in updatedList.values()) {
        commissionRequests.add(request);
      };
    };
  };

  public shared ({ caller }) func updateCommissionRequest(
    id : Text,
    name : Text,
    email : Text,
    commissionType : Text,
    referencePhotoUrl : ?Text,
    message : ?Text,
    status : CommissionStatus,
    photoRef : ?Storage.ExternalBlob
  ) : async () {
    let updatedList = List.empty<CommissionRequest>();
    var found = false;

    for (request in commissionRequests.values()) {
      if (request.id == id) {
        let updatedRequest = {
          id;
          name;
          email;
          commissionType;
          referencePhotoUrl;
          message;
          status;
          photoRef;
          submittedAt = request.submittedAt;
        };
        updatedList.add(updatedRequest);
        found := true;
      } else {
        updatedList.add(request);
      };
    };

    if (not found) {
      Runtime.trap("Request with id " # id # " not found");
    } else {
      commissionRequests.clear();
      for (request in updatedList.values()) {
        commissionRequests.add(request);
      };
    };
  };

  public query ({ caller }) func getCommissionRequestById(id : Text) : async ?CommissionRequest {
    for (request in commissionRequests.values()) {
      if (request.id == id) {
        return ?request;
      };
    };
    null;
  };
};
