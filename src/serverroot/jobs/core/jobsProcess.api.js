/*
 * Copyright (c) 2013 Juniper Networks, Inc. All rights reserved.
 */

var  topoCache = require('../api/topoCache.api')
	, bgpNode = require('../api/bgpNode.api')
	, computeNode = require('../api/computeNode.api')
	, nwMonJobsApi = require('../api/network.mon.jobs')
	, tpoCache     = require('../api/tpoCache.api')
	;

var jobsProcess = module.exports;

jobsProcess.processTreeTopoCacheRequestByJob = function (pubChannel, saveChannelKey, jobData, done) {
	topoCache.processTreeTopoCache(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processNetworkTopologyRequestByJob = function (pubChannel, 
                                                           saveChannelKey, 
                                                           jobData, done) {
    tpoCache.processTreeTopoCache(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processControlNodeRequestByJob = function (pubChannel, saveChannelKey, jobData, done) {
	bgpNode.processNodes(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processNodesRequestByJob = function (pubChannel, saveChannelKey, jobData, done) {
	bgpNode.processNodes(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processControlNodesTreeRequestByJob = function (pubChannel,
                                                               saveChannelKey,
                                                               jobData, done) {
    bgpNode.getControlNodeLists(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processControlNodeBgpPeerRequestByJob = function(pubChannel,
                                                             saveChannelKey,
                                                             jobData, done) {
    bgpNode.processControlNodeBgpPeer(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processControlNodesSummaryRequestByJob = function(pubChannel,
                                                             saveChannelKey,
                                                             jobData, done) {
    bgpNode.processControlNodesSummary(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processComputeNodeInterfaceRequestByJob = function(pubChannel,
                                                             saveChannelKey,
                                                             jobData, done) {
    computeNode.processComputeNodeInterface(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processComputeNodeAclRequestByJob = function(pubChannel,
                                                         saveChannelKey,
                                                         jobData, done) {
    computeNode.processComputeNodeAcl(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopNwDetailsByProjectRequestByJob = function(pubChannel,
                                                                saveChannelKey,
                                                                jobData, done) {
    nwMonJobsApi.processTopNwDetailsByProject(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopProjectDetailsByDomainRequestByJob = function(pubChannel,
                                                                     saveChannelKey,
                                                                     jobData, done) {
    nwMonJobsApi.processTopProjectDetailsByDomain(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopNwDetailsByDomainRequestByJob = function(pubChannel, 
                                                               saveChannelKey, 
                                                               jobData, done) {
    nwMonJobsApi.processTopNwDetailsByDomain(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopFlowsByConnectedNetworkRequestByJob = function(pubChannel, 
                                                               saveChannelKey, 
                                                               jobData, done) {
    nwMonJobsApi.processTopFlowsByConnectedNetwork(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processConnNetStatsSummaryRequestByJob = function(pubChannel, 
                                                              saveChannelKey, 
                                                              jobData, done) {
    nwMonJobsApi.processConnNetStatsSummary(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopPortByProjectRequestByJob = function(pubChannel, 
                                                          saveChannelKey, 
                                                          jobData, done) {
    var appData = jobData.taskData.appData;
    if (appData['portRange']) {
        nwMonJobsApi.getTrafficStatsByPort(pubChannel, saveChannelKey, jobData,
                                           done);
    } else {
        nwMonJobsApi.processTopPortByProject(pubChannel, saveChannelKey, jobData, done);
    }
}

jobsProcess.processTopPortByNetworkRequestByJob = function(pubChannel, 
                                                          saveChannelKey, 
                                                          jobData, done) {
    var appData = jobData.taskData.appData;
    if (appData['portRange']) {
        nwMonJobsApi.getTrafficStatsByPort(pubChannel, saveChannelKey, jobData,
                                           done);
    } else {
        nwMonJobsApi.processTopPortByNetwork(pubChannel, saveChannelKey, jobData, done);
    }
}

jobsProcess.processTopPortByConnNetRequestByJob = function(pubChannel,
                                                           saveChannelKey,
                                                           jobData, done) {
    nwMonJobsApi.processTopPortByNetwork(pubChannel, saveChannelKey, jobData,
                                         done,
                                         global.STR_GET_TOP_PORT_BY_CONN_NW);
}

jobsProcess.processTopPeerByNetworkRequestByJob = function(pubChannel, 
                                               saveChannelKey, 
                                               jobData, done) {
    nwMonJobsApi.processTopPeerByNetwork(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopPeerByConnNetRequestByJob = function(pubChannel,
                                                           saveChannelKey,
                                                           jobData, done) {
    nwMonJobsApi.processTopPeerByNetwork(pubChannel, saveChannelKey, jobData,
                                         done,
                                         global.STR_GET_TOP_PEER_BY_CONN_NW);
}

jobsProcess.processTopPeerDetailsRequestByJob = function(pubChannel,
                                                     saveChannelKey,
                                                     jobData, done) {
    console.log("getting Top Peer:");
    nwMonJobsApi.processTopPeerDetails(pubChannel, saveChannelKey, jobData,
                                       done);
}

jobsProcess.processTopFlowsByDomainRequestByJob = function(pubChannel, 
                                                          saveChannelKey, 
                                                          jobData, done) {
    nwMonJobsApi.processTopFlowsByDomain(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopFlowsByProjectRequestByJob = function(pubChannel, 
                                                          saveChannelKey, 
                                                          jobData, done) {
    nwMonJobsApi.processTopFlowsByProject(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopFlowsByNetworkRequestByJob = function(pubChannel, 
                                                            saveChannelKey, 
                                                            jobData, done) {
    nwMonJobsApi.processTopFlowsByNetwork(pubChannel, saveChannelKey, jobData,
                                          done, null);
}

jobsProcess.processTopFlowsByConnNetRequestByJob = function(pubChannel,
                                                            saveChannelKey,
                                                            jobData, done) {
    nwMonJobsApi.processTopFlowsByNetwork(pubChannel, saveChannelKey, jobData,
                                          done,
                                          global.STR_GET_TOP_FLOWS_BY_CONN_NW);
}

jobsProcess.processTopPortByDomainRequestByJob = function(pubChannel, 
                                                          saveChannelKey, 
                                                          jobData, done) {
    nwMonJobsApi.processTopPortByDomain(pubChannel, saveChannelKey, jobData, done);
}
                                                                                                                             
jobsProcess.processVNFlowSeriesDataRequestByJob = function(pubChannel, 
                                                           saveChannelKey, 
                                                           jobData, done) {
    nwMonJobsApi.processVNFlowSeriesData(pubChannel, saveChannelKey, 
                                          jobData, done);
}

jobsProcess.processVNsFlowSeriesDataRequestByJob = function(pubChannel, 
                                                           saveChannelKey, 
                                                           jobData, done) {
    nwMonJobsApi.processVNsFlowSeriesData(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processTopPeerByDomainRequestByJob = function(pubChannel, 
                                                         saveChannelKey, 
                                                         jobData, done) {
    nwMonJobsApi.processTopPeerByDomain(pubChannel, saveChannelKey, jobData, done); 
}

jobsProcess.processTopPeerByProjectRequestByJob = function(pubChannel, 
                                                         saveChannelKey, 
                                                         jobData, done) {
    nwMonJobsApi.processTopPeerByProject(pubChannel, saveChannelKey, jobData, done); 
}

jobsProcess.processTopPeerByVMRequestByJob = function(pubChannel, 
                                                      saveChannelKey, 
                                                      jobData, done) {
    nwMonJobsApi.processTopPeerByVM(pubChannel, saveChannelKey, jobData, done); 
}

jobsProcess.processTopPortByVMRequestByJob = function(pubChannel, 
                                                      saveChannelKey, 
                                                      jobData, done) {
    nwMonJobsApi.processTopPortByVM(pubChannel, saveChannelKey, jobData, done); 
}

jobsProcess.processTopFlowsByVMRequestByJob = function(pubChannel, 
                                                      saveChannelKey, 
                                                      jobData, done) {
    nwMonJobsApi.processTopFlowsByVM(pubChannel, saveChannelKey, jobData, done); 
}

jobsProcess.processFlowSeriesByVMRequestByJob = function(pubChannel, 
                                                      saveChannelKey, 
                                                      jobData, done) {
    nwMonJobsApi.processVMFlowSeriesData(pubChannel, saveChannelKey, jobData, done); 
}

jobsProcess.processVMStatSummaryRequestByJob = function(pubChannel, 
                                                        saveChannelKey, 
                                                        jobData, done) {
    nwMonJobsApi.processVMStatSummary(pubChannel, 
                                      saveChannelKey, jobData, done); 
}

jobsProcess.processPortLevelFlowSeriesRequestByJob = function(pubChannel,
                                                              saveChannelKey,
                                                              jobData, done) {
    nwMonJobsApi.getPortLevelFlowSeries(pubChannel, saveChannelKey, jobData,
                                        done);
}

jobsProcess.processFlowDetailsByFlowTupleRequestByJob = function(pubChannel, 
                                                                 saveChannelKey,
                                                                 jobData, done) {
    nwMonJobsApi.processTopFlowsByNetwork(pubChannel, saveChannelKey, jobData,
                                          done,
                                          global.STR_GET_FLOW_DETAILS_BY_FLOW_TUPLE);
}

jobsProcess.processCPULoadFlowSeriesRequestByJob = function(pubChannel,
                                                            saveChannelKey,
                                                            jobData,
                                                            done) {
    nwMonJobsApi.processCPULoadFlowSeries(pubChannel, saveChannelKey,
                                          jobData, done);
}

jobsProcess.mainJobprocessControlNodesSummaryRequestByJob = 
    function(pubChannel, saveChannelKey, dependData, storedData, jobData, done) {
    bgpNode.getControlNodesSummary(pubChannel, saveChannelKey, JSON.parse(dependData), 
                                   storedData, jobData, done);
}

jobsProcess.mainJobprocessControlNodeBgpPeerRequestByJob =   
    function(pubChannel, saveChannelKey, dependData, storedData, jobData, done) {
    bgpNode.getControlNodeBgpPeer(pubChannel, saveChannelKey, dependData, 
                                  storedData, jobData, done);
}

jobsProcess.mainJobprocessComputeNodeInterfaceRequestByJob =
    function(pubChannel, saveChannelKey, dependData, storedData, jobData, done) {
    computeNode.getComputeNodeInterface(pubChannel, saveChannelKey, dependData, 
                                        storedData, jobData, done);
}

jobsProcess.mainJobprocessComputeNodeAclRequestByJob =
    function(pubChannel, saveChannelKey, dependData, storedData, jobData, done) {
    computeNode.getComputeNodeAcl(pubChannel, saveChannelKey, dependData, 
                                  storedData, jobData, done);
}

jobsProcess.processControlNodeAutoCompleteListRequestByJob =   
    function(pubChannel, saveChannelKey, jobData, done) {
    bgpNode.getControlNodeAutoCompleteList(pubChannel, saveChannelKey, jobData, done);
}
  
jobsProcess.processvRouterListRequestByJob =   
    function(pubChannel, saveChannelKey, jobData, done) {
    computeNode.getvRouterList(pubChannel, saveChannelKey, jobData, done);
}

jobsProcess.processcRouterAclFlowsRequestByJob =
    function(pubChannel, saveChannelKey, jobData, done) {
    computeNode.getvRouterAclFlows(pubChannel, saveChannelKey, jobData, done);
}

